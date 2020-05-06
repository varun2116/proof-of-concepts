import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";

const NodeDetails = ({ name, onAddChild, onDeleteChild }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const inputRef = useRef();

  /**
   * On Add Modal Submit
   */
  const onAdd = () => {
    if (!isEmpty(inputRef.current.value)) {
      onAddChild({
        name: inputRef.current.value,
      });
      setShowAddModal(false);
    }
  };

  /**
   * On Delete Modal Submit
   */
  const onDelete = () => {
    onDeleteChild();
  }

  return (
    <React.Fragment>
      <div className="node-details">
        <p>{name}</p>
        <button
          className="button button-default"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
        </button>
        <button
          className="button button-delete"
          onClick={() => setShowDeleteModal(true)}
        >
          <MdDelete />
        </button>
      </div>

      <Modal show={showAddModal}>
        <div className="modal-header">
          <div className="modal-title">Add Child</div>
        </div>
        <div className="modal-body">
          <input type="text" className="form-control" ref={inputRef} />
        </div>
        <div className="modal-footer">
          <button className="button button-primary" onClick={() => onAdd()}>
            Add
          </button>
          <button
            className="button button-cancel"
            onClick={() => setShowAddModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal show={showDeleteModal}>
        <div className="modal-header">
          <div className="modal-title">Delete {name}</div>
        </div>
        <div className="modal-body">Are you sure you want to delete ?</div>
        <div className="modal-footer">
          <button className="button button-primary" onClick={() => onDelete()}>
            Delete
          </button>
          <button
            className="button button-cancel"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default NodeDetails;
