import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { shoppingViewHeaderMenuItems } from "@/config";

const MenuSheet = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} side="left">
      <SheetContent className="w-[300px] sm:w-[380px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-1 mt-6">
          {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Link
              key={menuItem.id}
              to={menuItem.path}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
              onClick={() => onOpenChange(false)}
            >
              {menuItem.icon && <menuItem.icon size={20} />}
              <span>{menuItem.label}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
