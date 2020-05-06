import { uniqueId, map } from "lodash";
import React, { Component } from "react";
import ParentNode from "../ParentNode";
import { TreeJson } from "./constants";

class FamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: TreeJson,
    };
  }

  /**
   * Update state tree at the index
   */
  updateTree = (data, atIndex) => {
    let treeData = this.state.tree;
    treeData[atIndex] = data;
    this.setState({
      tree: treeData,
    });
  };

  render() {
    const { tree } = this.state;
    return (
      <React.Fragment>
        <div className="family-tree">
          <div className="node-list">
            {map(tree, (ele, idx) => (
              <ParentNode
                key={uniqueId("parent-")}
                data={ele}
                updateTree={(data) => this.updateTree(data, idx)}
                isRoot={true}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FamilyTree;
