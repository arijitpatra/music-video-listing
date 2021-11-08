import { Icon } from "semantic-ui-react";
import { FC } from "react";
import "./Card.scss";

interface ICardProps {
  image_url: string;
  artist: string;
  title_label: string;
  genre: string;
}

export const Card: FC<ICardProps> = ({
  image_url,
  artist,
  title_label,
  genre,
}) => {
  return (
    <section className="d-f fd-c ai-c" data-testid="test-card">
      <img loading="lazy" src={image_url} alt={`${artist}-${title_label}`} />
      <h3 title={artist}>{artist}</h3>
      <h5 title={title_label}>{title_label}</h5>
      <h6 title={genre}>
        <Icon name="music" /> {genre}
      </h6>
    </section>
  );
};
