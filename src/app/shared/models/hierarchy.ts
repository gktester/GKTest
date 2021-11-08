export interface NodeChild {
  nodeId: string;
  nodeName: string;
  children?: NodeChild[] | null;
}

export interface Entity {
  nodeStandardMetadata: NodeChild;
}

export interface Hierarchy {
  status: number;
  entity: Entity;
}
