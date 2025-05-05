import { flip, offset, shift, useFloating, useInteractions, useHover } from "@floating-ui/react";
import { type FC, memo, useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, content }) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), flip(), shift()],
    placement: "top",
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {open && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={{ ...floatingStyles }}>
          {content}
        </div>
      )}
    </>
  );
};

export default memo(Tooltip);
