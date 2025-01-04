import { HTMLReactParserOptions, Element } from "html-react-parser";

const HTMLPaserImageOptions: HTMLReactParserOptions = {
  replace(domNode) {
    const element = domNode as Element;
    if (element.attribs && element.attribs["data-org"] === "serverAws") {
      element.attribs[
        "src"
      ] = `https://pczxqazwgbrrqalnwolo.supabase.co/storage/v1/object/public/react-simple-quiz-images/${element.attribs["src"]}.png`;
    }
  },
};

export default HTMLPaserImageOptions;
