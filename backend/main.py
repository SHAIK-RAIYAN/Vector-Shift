from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pipeline data model
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    # Create directed graph from edges
    G = nx.DiGraph()
    
    # Add edges to graph (edges have 'source' and 'target' fields)
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            G.add_edge(source, target)
    
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': nx.is_directed_acyclic_graph(G)
    }
