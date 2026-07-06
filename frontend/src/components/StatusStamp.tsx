export default function StatusStamp({ isClosed }: { isClosed: boolean }) {
  return (
    <span className={"stamp " + (isClosed ? "stamp--closed" : "stamp--open")}>
      <span className="stamp__dot" />
      {isClosed ? "Lezárva" : "Nyitva"}
    </span>
  );
}
