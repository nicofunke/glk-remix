import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { Concert, getConcert } from "~/models/concert.server";
import { URL_CONCERTS } from ".";

type LoaderData = {
  concert: Concert;
};

export const loader: LoaderFunction = async ({ params }) => {
  const concert = await getConcert(params.id || "-1");
  if (!concert) return redirect(URL_CONCERTS);

  const output: LoaderData = { concert };
  return json(output);
};

export default function ConcertInformation() {
  const { concert } = useLoaderData<LoaderData>();
  return (
    <>
      <h1>{concert.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: concert.description }} />
    </>
  );
}
