import { uniqueId, isNil, map, isEmpty, get } from "lodash";
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
    treeData.children = [...get(treeData, "children", []), child];
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
      if (isEmpty(treeData.children)) {
        delete treeData.children;
      }
    }
    this.setState({
      data: treeData,
    });
    this.props.updateTree(treeData);
  };

  /**
   * Edits Child Name
   */
  onEditChild = (name) => {
    let data = this.state.data;
    data.name = name;
    this.props.updateTree(data);
  };

  render() {
    const {
      data: { name, children },
    } = this.state;
    const { isRoot = false } = this.props;

    return (
      <div className="node">
        <NodeDetails
          name={name}
          onAddChild={this.onAddChild}
          onDeleteChild={this.onDeleteChild}
          isRoot={isRoot}
          onEditChild={this.onEditChild}
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
