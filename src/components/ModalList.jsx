import React, { useState } from "react";
import "../App.css";
import * as Dialog from "@radix-ui/react-dialog";
import * as FiIcons from "react-icons/fi";

// Convertiamo gli import in un array di oggetti dinamico
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

const ICONS = ICON_KEYS.map((key) => ({
  name: key,
  icon: FiIcons[key],
}));

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

export default function ModalList({ open, onOpenChange, onConfirm }) {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedIconName, setSelectedIconName] = useState(ICONS[0].name);

  const isValid = name.trim().length > 0;
  const iconObj = ICONS.find((iconObj) => iconObj.name === selectedIconName);
  const IconeComponent = iconObj.icon;

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

  const resetModal = () => {
    setName("");
    setSelectedColor(COLORS[0]);
    setSelectedIconName(ICONS[0].name);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) resetModal(); // reset solo alla chiusura
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-sm z-50" />
        <Dialog.Content
          style={{ backgroundColor: "rgb(37, 35, 33)" }}
          className="fixed top-1/2 left-1/2 p-8 rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-lg text-gray-100 font-sans z-50
            max-h-[90vh] overflow-y-auto
            sm:p-6 sm:rounded-xl
            xs:p-1 xs:rounded-md xs:w-[99vw] xs:max-w-full"
        >
          <div className="flex items-center justify-between mb-3 xs:mb-1 xs:py-0.5">
            <Dialog.Close asChild>
              <button
                className="bg-transparent border-transparent text-blue-600 hover:text-blue-500 opacity-90 hover:opacity-100 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 px-2 py-1 xs:text-xs xs:px-0.5 xs:py-0"
                type="button"
                onClick={resetModal}
              >
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Title className="text-2xl font-extrabold text-center flex-grow mx-2 xs:text-base xs:mx-0.5 xs:py-0">
              New list
            </Dialog.Title>
            <button
              type="button"
              className={`bg-transparent border-transparent text-lg font-semibold transition relative focus:outline-none px-3 py-1 ${
                isValid
                  ? "text-blue-600 hover:text-blue-500"
                  : "text-gray-500 cursor-not-allowed"
              } xs:text-xs xs:px-0.5 xs:py-0`}
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

          {/* PREVIEW */}
          <div className="flex justify-center mb-1 xs:mb-0.5 xs:py-0">
            <div
              className="aspect-square inline-flex items-center justify-center rounded-full bg-neutral-800 p-4 mb-2 xs:p-1 xs:mb-0"
              style={{ backgroundColor: "rgb(50, 48, 46)" }}
            >
              <IconeComponent size={28} className="xs:w-6 xs:h-6" color={selectedColor} />
            </div>
          </div>

          {/* INPUT */}
          <Dialog.Description className="mb-4 text-gray-400 text-base xs:text-xs xs:mb-1 xs:py-0">
            Enter the name of the new list
          </Dialog.Description>

          <input
            type="text"
            style={{
              backgroundColor: "rgb(50, 48, 46)",
              color: selectedColor,
              borderColor: "rgb(70, 70, 70)",
              height: '2.1rem',
            }}
            className="w-full p-3 rounded-lg text-gray-100 placeholder-gray-500 shadow-inner font-bold focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-blue-500 transition xs:p-1 xs:text-xs xs:h-7"
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

          {/* COLORI */}
          <div
            className="bg-neutral-800 p-3 rounded-lg mb-3 mt-3 xs:p-1 xs:mb-1 xs:mt-1"
            style={{ backgroundColor: "rgb(50, 48, 46)" }}
          >
            <div className="grid grid-cols-6 gap-3 justify-items-center xs:grid-cols-4 xs:gap-1">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`aspect-square w-8 rounded-full border-2 transition-transform duration-150 ${
                    selectedColor === color
                      ? "border-white scale-110"
                      : "border-transparent"
                  } xs:w-5 xs:h-5`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* ICONE */}
          <div
            className="bg-neutral-800 p-3 rounded-lg mb-1 mt-3 xs:p-1 xs:mb-1 xs:mt-1"
            style={{ backgroundColor: "rgb(50, 48, 46)" }}
          >
            <div className="icon-grid grid grid-cols-6 justify-items-center xs:grid-cols-4 xs:gap-1">
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
                    } xs:h-6`}
                    aria-label={`Select icon ${name}`}
                  >
                    <IconComponent size={12} className="xs:w-3 xs:h-3" color="white" />
                  </button>
                );
              })}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
