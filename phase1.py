import networkx as nx
import matplotlib.pyplot as plt

def initialize_uav_airspace(grid_size=5):
    """
    Creates a 2D grid representing the UAV flight area.
    """
    # Generate a 2D grid graph (nodes are tuples like (0,0), (0,1)...)
    G = nx.grid_2d_graph(grid_size, grid_size)
    
    # Assign a baseline 'cost' (weight) to every flight path.
    # A weight of 1.0 represents standard battery/time consumption for one block.
    for (u, v) in G.edges():
        G.edges[u, v]['weight'] = 1.0
        
    return G

def visualize_grid(G):
    """
    Plots the graph so you can visually verify the coordinate system.
    """
    # Create a layout where the position of the node perfectly matches its (x,y) coordinate
    pos = {(x,y): (y, -x) for x,y in G.nodes()} 
    
    plt.figure(figsize=(8, 8))
    
    # Draw the nodes and edges
    nx.draw(G, pos, 
            node_color='lightblue', 
            with_labels=True, 
            node_size=2000, 
            font_weight='bold',
            font_size=10,
            edge_color='gray')
    
    # Add edge weight labels (currently all 1.0)
    edge_labels = nx.get_edge_attributes(G, 'weight')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)
    
    plt.title("UAV Airspace Grid (Baseline Status)", size=15)
    plt.show()

# Run the initialization
if __name__ == "__main__":
    print("Booting UAV Airspace Simulation...")
    airspace = initialize_uav_airspace(5)
    
    print(f"Active Waypoints (Nodes): {airspace.number_of_nodes()}")
    print(f"Valid Flight Paths (Edges): {airspace.number_of_edges()}")
    
    visualize_grid(airspace)