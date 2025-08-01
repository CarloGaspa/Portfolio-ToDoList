// =============================
// ModalList Component
// =============================
import React, { useState } from "react";
import "../App.css";
import * as Dialog from "@radix-ui/react-dialog";
import * as FiIcons from "react-icons/fi";

// List of available icon keys for selection
const ICON_KEYS = [
  "FiList",
  "FiCpu",
  "FiDatabase",
  "FiCloud",
  "FiAward",
  "FiPieChart",
  "FiBarChart2",
  "FiSlack",
  "FiBook",
  "FiTwitter",
  "FiLinkedin",
  "FiYoutube",
  "FiServer",
  "FiShield",
  "FiKey",
  "FiMail",
  "FiUsers",
  "FiZap",
  "FiTarget",
  "FiPocket",
  "FiClock",
  "FiHelpCircle",
  "FiMap",
  "FiNavigation",
];

// Map icon keys to icon components
const ICONS = ICON_KEYS.map((key) => ({
  name: key,
  icon: FiIcons[key],
}));

// List of available colors for selection
const COLORS = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#FFEB3B",
];

/**
 * Renders a modal dialog for creating a new list with name, color, and icon selection.
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.onOpenChange - Handler for modal open/close
 * @param {Function} props.onConfirm - Handler for confirming the new list
 */
export default function ModalList({ open, onOpenChange, onConfirm }) {
  // ===== State for modal fields =====
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIconName, setSelectedIconName] = useState(ICONS[0].name);

  // ===== Derived values =====
  const isValid = name.trim().length > 0;
  const iconObj = ICONS.find((iconObj) => iconObj.name === selectedIconName);
  const IconeComponent = iconObj.icon;

  // ===== Handler: Confirm creation of new list =====
  const handleConfirm = () => {
    if (!isValid) return;
    const newList = {
      id: `list-${Date.now()}`,
      name: name.trim(),
      icon: IconeComponent,
      deletable: true,
      color: selectedColor,
    };
    onConfirm(newList);
    resetModal();
  };

  // ===== Handler: Reset modal fields =====
  const resetModal = () => {
    setName("");
    setSelectedColor(COLORS[0]);
    setSelectedIconName(ICONS[0].name);
  };

  // =============================
  // Render Modal Dialog Layout
  // =============================
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) resetModal(); // Reset only on close
      }}
    >
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-sm z-50" />
        <Dialog.Content
          style={{ backgroundColor: "rgb(37, 35, 33)" }}
          className="fixed left-1/2 top-[4.5rem] bottom-4 -translate-x-1/2 w-[98vw] max-w-lg p-4 rounded-xl shadow-2xl text-gray-100 font-sans z-50 flex flex-col
                     sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:p-8 sm:rounded-2xl sm:w-[88%]"
        >
          {/* Header: Cancel, Title, Done */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <Dialog.Close asChild>
              <button
                className="bg-transparent border-transparent text-blue-600 hover:text-blue-500 opacity-90 hover:opacity-100 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 px-2 py-1"
                type="button"
                onClick={resetModal}
              >
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Title className="text-2xl font-extrabold text-center flex-grow mx-2">
              New list
            </Dialog.Title>
            <button
              type="button"
              className={`bg-transparent border-transparent text-lg font-semibold transition relative focus:outline-none px-3 py-1 ${
                isValid
                  ? "text-blue-600 hover:text-blue-500"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleConfirm}
              disabled={!isValid}
            >
              Done
              {isValid && (
                <span
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 rounded transition-transform origin-left scale-x-0 hover:scale-x-100"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          <div className="overflow-y-auto flex-grow">
            {/* Preview of selected icon and color */}
            <div className="flex justify-center mb-1">
              <div
                className="aspect-square inline-flex items-center justify-center rounded-full bg-neutral-800 p-4 mb-2"
                style={{ backgroundColor: "rgb(50, 48, 46)" }}
              >
                <IconeComponent size={50} color={selectedColor} />
              </div>
            </div>

            {/* Input: List name */}
            <Dialog.Description className="mb-4 text-gray-400 text-base">
              Enter the name of the new list
            </Dialog.Description>

            <input
              type="text"
              style={{
                backgroundColor: "rgb(50, 48, 46)",
                color: selectedColor,
                borderColor: "rgb(70, 70, 70)",
              }}
              className="w-full p-3 rounded-lg text-gray-100 placeholder-gray-500 shadow-inner font-bold focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-blue-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isValid) {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
              placeholder="List Name"
              autoFocus
            />

            {/* Color selection */}
            <div
              className="bg-neutral-800 p-3 rounded-lg mb-3 mt-3"
              style={{ backgroundColor: "rgb(50, 48, 46)" }}
            >
              <div className="grid grid-cols-6 gap-3 justify-items-center">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`aspect-square w-8 rounded-full border-2 transition-transform duration-150 ${
                      selectedColor === color
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Icon selection */}
            <div
              className="bg-neutral-800 p-3 rounded-lg mb-1 mt-3"
              style={{ backgroundColor: "rgb(50, 48, 46)" }}
            >
              <div className="icon-grid grid grid-cols-6 justify-items-center">
                {ICONS.map(({ name, icon: IconComponent }) => {
                  const isSelected = selectedIconName === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedIconName(name)}
                      className={`aspect-square h-10 flex items-center justify-center rounded-full border transition-transform duration-150 ${
                        isSelected
                          ? "border-white scale-110"
                          : "border-transparent"
                      }`}
                      aria-label={`Select icon ${name}`}
                    >
                      <IconComponent size={18} color="white" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
