import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { Concert, getConcerts } from "~/models/concert.server";
import { useOptionalUser } from "~/utils";

type LoaderData = {
  concerts: Concert[];
};

export const URL_CONCERTS = "/concerts";

export const loader = async () => {
  return json<LoaderData>({
    concerts: await getConcerts(),
  });
};

export default function Concerts() {
  const user = useOptionalUser();
  const { concerts } = useLoaderData<LoaderData>();
  return (
    <>
      <h1>Konzerte</h1>
      <ul>
        {concerts.map((concert) => (
          <li> {concert.title}</li>
        ))}
      </ul>
    </>
  );
}
