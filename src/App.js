import React from "react";
import "./App.css";
import { SupTitle } from "@kisskissbankbank/kitten/src/components/typography/sup-title";
import { Container } from "@kisskissbankbank/kitten/src/components/grid/container";
import { CrowdfundingCard } from "@kisskissbankbank/kitten/src/components/cards/crowdfunding-card";
import COLORS from "@kisskissbankbank/kitten/src/constants/colors-config";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_PROJECTS = gql`
  query {
    getProjects {
      id
      name
      image
      fundingPercent
      shortDesc
      owner {
        city
        image
        username
      }
    }
  }
`;

const App = () => {
  const { data, loading } = useQuery(GET_PROJECTS);
  return (
    <Container>
      <img src="/logo.jpg" alt="" />
      <SupTitle>Make Good projets inspirants</SupTitle>
      <div className="kbule_wrapper">
        {loading
          ? Array(16)
              .fill(null)
              .map(() => {
                return <CrowdfundingCard loading className="kbule_card" />;
              })
          : data.getProjects.map((project) => {
              return (
                <CrowdfundingCard
                  key={project.id}
                  href={project.publicUrl}
                  imageProps={{
                    src: project.image,
                    alt: "",
                    backgroundColor: COLORS.line2,
                    color: COLORS.font1,
                    loading: "lazy",
                  }}
                  avatarProps={{
                    src: project.owner.image,
                    alt: "",
                  }}
                  ownerTitle={project.owner.username}
                  ownerDescription={project.owner.city}
                  cardTitle={project.name}
                  cardSubTitle={project.shortDesc}
                  progress={project.fundingPercent}
                  className="kbule_card"
                  stretch
                />
              );
            })}
      </div>
    </Container>
  );
};

export default App;
