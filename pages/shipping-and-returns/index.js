import Head from "next/head";
import { Query } from "react-apollo";
import TextPage from "../../components/TextPage";
import gql from "graphql-tag";
import { renderMetaTags } from "react-datocms";

const PAGE_QUERY = gql`
  {
    site: _site {
      favicon: faviconMetaTags {
        attributes
        content
        tag
      }
    }
    shippingAndReturn {
      body(markdown: true)
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`;

class TermsOfService extends React.Component {
  render() {
    return (
      <Query query={PAGE_QUERY}>
        {({ loading, error, data }) => {
          if (loading || !data) return <div className="loading" />;
          return (
            <>
              <Head>{renderMetaTags([...data.shippingAndReturn.seo, ...data.site.favicon])}</Head>
              <TextPage content={data.shippingAndReturn.body} />
            </>
          )
        }}
      </Query>
    );
  }
}

export default TermsOfService;
