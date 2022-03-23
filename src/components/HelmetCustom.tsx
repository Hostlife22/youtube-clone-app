import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface HelmetCustomProps {
  title?: string | undefined;
  description?: string | undefined;
}

const HelmetCustom: FC<HelmetCustomProps> = ({
  title = "YouTube",
  description = "a project made with youtube api adn react js",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HelmetCustom;
