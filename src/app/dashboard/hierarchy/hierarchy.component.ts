import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { UserService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Hierarchy, NodeChild } from 'src/app/shared/models';


interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {
  public treeData: NodeChild[] = [];
  constructor(private userService: UserService, private _location: Location) {
  }

  ngOnInit(): void {
    this.getTreeData();
  }

  private _transformer = (node: any, level: any) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.nodeName,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  getTreeData() {
    this.userService.getNodeHierarchy().pipe(map((hierarchy: Hierarchy) => {
      return [{
        nodeId: 'temp-1',
        nodeName: 'GK_UI_TEST',
        children: [hierarchy.entity.nodeStandardMetadata],
      }];
    })).subscribe((mappedHierarchy: NodeChild[]) => {
      this.treeData = mappedHierarchy;
      this.dataSource.data = mappedHierarchy;
    });
  }

  goBackToDashboard() {
    this._location.back();
  }
}
