export const StatusCell = ({ isLocked }: { isLocked: boolean }) => {
  if (isLocked) {
    return <p>block</p>;
    // <BlockIcon fontSize="small" />;
  }

  return <p>check</p>;
  // <CheckIcon fontSize="small" />;
};
