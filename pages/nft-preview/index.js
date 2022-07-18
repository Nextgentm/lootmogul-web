// import strapi from '../../src/utils/strapi';
import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import NFTPreview from "../../src/features/PreviewNFTs/components";
// const NFTPreview = dynamic(() => import("../../src/features/PreviewNFTs/components"),  { loading: () =>
//   <MyPageLoader/>
//  })

const NFTPreviewComponent = dynamic(
  () => import("../../src/features/PreviewNFTs/components"),
  { loading: () => <MyPageLoader /> }
);

export default function PreviewNFTPage({data}) {
  return (
    <>
      {" "}
      <NFTPreview />
      <NFTPreviewComponent data={data || []} />
    </>
  );
}
