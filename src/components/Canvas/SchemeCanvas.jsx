import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CircuitNode from './customNodes/CircuitNode';
import { useScheme } from '../../store/SchemeContext';

const nodeTypes = {
  circuitComponent: CircuitNode,
};

let id = 0;
const getId = () => `node_${++id}`;

const SchemeCanvas = ({ height = '100%' }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { loadScheme, registerSchemeData, isLoading } = useScheme();

  useEffect(() => {
    registerSchemeData({ nodes, edges });
  }, [nodes, edges, registerSchemeData]);

  useEffect(() => {
    const fetchScheme = async () => {
      const initialData = await loadScheme();
      if (initialData) {
        setNodes(initialData.nodes || []);
        setEdges(initialData.edges || []);
      }
    };
    fetchScheme();
  }, [loadScheme, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#FF0072',
        },
        style: { stroke: '#FF0072', strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData || !reactFlowInstance) return;

      const { type, data } = JSON.parse(rawData);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { ...data },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        flexGrow: 1,
        height,
        minHeight: 300,
        position: 'relative',
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.7)',
            zIndex: 10,
          }}
        >
          Загрузка схемы...
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        connectionLineStyle={{ stroke: '#999', strokeWidth: 2 }}
        connectionLineType="smoothstep"
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode="Shift"
      >
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(n) => {
            if (n.data?.componentType === 'powerSource') return '#d32f2f';
            if (n.data?.componentType === 'resistor') return '#1976d2';
            return '#718096';
          }}
        />
        <Background variant="dots" gap={20} size={1} color="#e2e8f0" />
      </ReactFlow>
    </div>
  );
};

export default SchemeCanvas;
