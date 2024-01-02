import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import { useContext, useEffect, useState } from "react";
import GamesCategories from "./GamesCategoriesSingle";
import React from "react";

const GamesComponent = ({ contestSectionsData }) => {
  const { isMobileDevice } = useContext(AppContext);

  const [itemRefs, setItemRefs] = useState([]);

  useEffect(() => {
    let irs = [];
    for (let i = 0; i < 100; i++) {
      irs[i] = React.createRef();
    }
    setItemRefs(irs);
  }, []);

  const router = useRouter();
  const [contestSections, setContestSections] = useState([]);

  
  const { callAuthService } = useContext(AppContext);

  useEffect(() => {
    if (!router.isReady) return;
    const access_token = router.query.access_token;
    const provider = router.query.provider;
    if (access_token) {
      if (provider == "facebook") {
        callAuthService("facebook", access_token);
      } else {
        callAuthService("google", access_token);
      }
    }
  }, [router.isReady]);

  // Optimised code
  useEffect(() => {
    setContestSections(contestSectionsData);
  }, [contestSectionsData]);
 
  return (
    <Box>
      <Box mx={[4, 8]}>
        <Box mb={"4vw"}>
          <Box>
            {contestSections &&
              contestSections.map((section, index) => (
                <Box
                  key={"sec-index-" + index}
                  ref={itemRefs[section.priority]}

                >
                  {section?.contestmasters?.data &&
                    section?.contestmasters?.data.length > 0 && (
                      <GamesCategories
                        key={`games-${index}`}
                        isMobileDevice={isMobileDevice}
                        section={section}
                      />
                    )}
                </Box>
              ))}
          </Box>          
        </Box>
      </Box>
    </Box>
  );
};

export default GamesComponent;