let { gql, ApolloServer } = require("apollo-server-lambda");
let { RESTDataSource } = require("apollo-datasource-rest");

let typeDefs = gql`
  type Owner {
    image: String
    username: String
    city: String
  }
  type Project {
    id: ID
    name: String
    image: String
    publicUrl: String
    owner: Owner
    shortDesc: String
    fundingPercent: String
  }
  type Query {
    getProjects: [Project]
  }
`;

class KissBankuleAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.ulule.com/v1/search/";
  }

  async getProjects() {
    const data = await this.get(
      "projects?q=sort:popular+status:currently&extra_fields=main_image,main_tag,owner,partnerships&lang=fr"
    );
    return data.projects.map((project) => ({
      id: project.id,
      name: project.name_fr,
      image: project.image,
      shortDesc: project.subtitle_fr,
      publicUrl: project.absolute_url,
      fundingPercent: Math.round((project.amount_raised / project.goal) * 100),
      owner: {
        image:
          "https://www.kisskissbankbank.com/assets/avatar/svg/default-6.svg",
        username: project.owner.screenname,
        city: "",
      },
    }));
  }
}

let resolvers = {
  Query: {
    getProjects: async (_source, { id }, { dataSources }) => {
      return dataSources.kissBankuleAPI.getProjects();
    },
  },
};

let server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ kissBankuleAPI: new KissBankuleAPI() }),
  playground: true,
});

module.exports = server.createHandler();
