import { isEmpty } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "../Modal";

const NodeDetails = ({
  name,
  onAddChild,
  onDeleteChild,
  onEditChild,
  isRoot,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (showEdit) {
      inputRef.current.focus();
    }
  });

  /**
   * On Add Modal Submit
   */
  const onAdd = () => {
    onAddChild({
      name: "Name",
    });
    // setShowAddModal(false);
  };

  /**
   * On Delete Modal Submit
   */
  const onDelete = () => {
    onDeleteChild();
  };

  /**
   * On Edit Name
   */
  const onEdit = (e) => {
    try {
      if (!isEmpty(inputRef.current.value)) {
        onEditChild(inputRef.current.value);
        setShowEdit(false);
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <div className="node-details">
        {!showEdit && <p>{name}</p>}
        {showEdit && (
          <input
            type="text"
            className="form-control"
            defaultValue={name}
            ref={inputRef}
            onBlur={onEdit}
          />
        )}
        <div className="actions">
          <button
            type="button"
            className="button button-default"
            onClick={() => setShowEdit(true)}
          >
            <FaPen />
          </button>

          <button
            type="button"
            className="button button-default"
            onClick={() => onAdd()}
          >
            <FaPlus />
          </button>

          {!isRoot && (
            <button
              type="button"
              className="button button-delete"
              onClick={() => setShowDeleteModal(true)}
            >
              <MdDelete />
            </button>
          )}
        </div>
      </div>

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
