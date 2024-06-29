"use client";
import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
