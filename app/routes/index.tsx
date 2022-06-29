import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <>
      <Link to="/concerts" className="text-xl text-blue-600 underline">
        Show concerts
      </Link>
    </>
  );
}
