import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { UserService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

interface ExampleFlatNode {
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
  public treeData = [];
  constructor(private hierarchyService: UserService, private _location:Location) {
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

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getTreeData() {
    this.hierarchyService.getNodeHierarchy().subscribe((response: any) => {
      console.log(response);
      this.treeData = response.entity.nodeStandardMetadata;
      this.dataSource.data = [response.entity.nodeStandardMetadata];
    });
}

gobacktoDashboard(){
  this._location.back();
}
}
