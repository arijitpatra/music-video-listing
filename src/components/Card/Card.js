import "./Card.scss";

export const Card = ({ image_url, artist, title, genre }) => {
  return (
    <section>
      <img loading="lazy" src={image_url} alt={`${artist}-${title}`} />
      <h2>{artist}</h2>
      <h5>{title}</h5>
      <h6>{genre}</h6>
    </section>
  );
};
