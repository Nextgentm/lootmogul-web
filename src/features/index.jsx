// import ApolloClient from "apollo-boost";
// // import { ApolloProvider } from "@apollo/client";

// import { extendTheme } from "@chakra-ui/react";
// import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";

// import Routes from "./Routes";
// import { AppContextContainer } from "./AppContext";
// import { Helmet } from "react-helmet";
// import AppFooter from "./AppFooter";
// import ChakraUIContainer from "../styles/ChakraUI";

// const cache = new InMemoryCache({
//     dataIdFromObject: (object) => object._id || defaultDataIdFromObject(object)
// });

// // const client = new ApolloClient({
// //     uri: "https://proconnect.postcard.travel/graphql",
// //     cache
// // });

// const Main = () => {
//     return (
//         <ChakraUIContainer>
//             <AppContextContainer>
//                 {({ title, description }) => (
//                     <>
//                         <div
//                             style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 minHeight: "100vh"
//                             }}
//                         >
//                             <div style={{ flex: 1 }}>
//                                 {/* <ApolloProvider client={client}> */}
//                                     <Routes />
//                                 {/* </ApolloProvider> */}
//                             </div>
//                         </div>
//                         <AppFooter />
//                     </>
//                 )}
//             </AppContextContainer>
//         </ChakraUIContainer>
//     );
// };

// export default Main;
