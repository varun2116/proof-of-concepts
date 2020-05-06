import React, { Component } from "react";
import NodeDetails from "../NodeDetails";

class LeafNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  /**
   * Add Child to Leaf Node
   */
  onAddChild = (child) => {
    this.setState(
      {
        data: {
          ...this.state.data,
          children: [child],
        },
      },
      () => {
        this.props.updateTree(this.state.data);
      }
    );
  };

  /**
   * Delete Child at Leaf Node
   */
  onDeleteChild = () => {
    this.setState({
      data: {},
    });
    this.props.updateTree({});
  };

  render() {
    const {
      data: { name },
    } = this.state;
    return (
      <div className="node">
        <NodeDetails
          name={name}
          onAddChild={this.onAddChild}
          onDeleteChild={this.onDeleteChild}
        />
      </div>
    );
  }
}

export default LeafNode;
