import { uniqueId, isNil, map, isEmpty } from "lodash";
import React, { Component } from "react";
import LeafNode from "../LeafNode";
import NodeDetails from "../NodeDetails";

class ParentNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  /**
   * Add Child to the Parent
   */
  onAddChild = (child) => {
    let treeData = this.state.data;
    treeData.children = [...treeData.children, child];
    this.setState({
      data: treeData,
    });
    this.props.updateTree(this.state.data);
  };

  /**
   * Delete Child at Parent Node
   */
  onDeleteChild = () => {
    this.setState({
      data: {},
    });
    this.props.updateTree({});
  };

  /**
   * Update state tree at the index
   */
  updateTree = (data, atIndex) => {
    let treeData = this.state.data;
    if (!isEmpty(data)) {
      treeData.children[atIndex] = data;
    } else {
      treeData.children.splice(atIndex, 1);
    }
    this.setState({
      data: treeData,
    });
    this.props.updateTree(treeData);
  };

  render() {
    const {
      data: { name, children },
    } = this.state;

    return (
      <div className="node">
        <NodeDetails
          name={name}
          onAddChild={this.onAddChild}
          onDeleteChild={this.onDeleteChild}
        />
        <div className="node-list">
          {map(children, (ele, idx) => {
            const { children: child } = ele;
            if (isNil(child)) {
              return (
                <LeafNode
                  key={uniqueId("leaf-")}
                  data={ele}
                  updateTree={(data) => this.updateTree(data, idx)}
                />
              );
            } else {
              return (
                <ParentNode
                  key={uniqueId("parent-")}
                  data={ele}
                  updateTree={(data) => this.updateTree(data, idx)}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ParentNode;
