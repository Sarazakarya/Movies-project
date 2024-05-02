import React from "react";
import { Row } from "react-bootstrap";
import Cardmovie from "./Cardmovie";
import Pagenation from "./Pagenation";

export default function MoviesList({ movies, getPage, pageCount }) {
  return (
    <Row className="mt-3">
      {movies.length > 1 ? (
        movies.map((mov) => {
          return <Cardmovie mov={mov} />;
        })
      ) : (
        <h3 className="text-center p-5">لا يوجد افلام </h3>
      )}
       {movies.length >=1 ?  <Pagenation getPage={getPage} pageCount={pageCount} /> : null}
    </Row>
  );
}
