import React from "react";
import { Card, Button, Space, Typography, Row, Flex } from "antd";
import { StarOutlined, ShareAltOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function SupportAuthor() {
  const openStorePage = () => {
    chrome.tabs.create({
      url: "https://chromewebstore.google.com/detail/any-search/ifgfnphneemmhccaknmidjnhemkhnoah/reviews",
    });
  };

  const shareOnPlatform = (platform) => {
    const text = encodeURIComponent(
      "Check out TypeGo - The ultimate browser extension for command-based multi-engine searches! 🔍\n\n• Supports 100+ search engines (g=Google, gt=Google translate, etc)\n• Fully customizable commands and search engines\n• Lightning-fast results with zero redirects\n\nPerfect for developers, researchers & power users!"
    );
    let pluginUrl =
      "https://chromewebstore.google.com/detail/ifgfnphneemmhccaknmidjnhemkhnoah";
    let url;

    switch (platform) {
      case "x":
        pluginUrl = `${pluginUrl}?utm_source=item-share-x`;
        url = `https://x.com/intent/tweet?text=${text}&url=${pluginUrl}`;
        break;
      case "facebook":
        pluginUrl = `${pluginUrl}?utm_source=item-share-facebook`;
        url = `https://www.facebook.com/sharer/sharer.php?u=${pluginUrl}`;
        break;
      case "linkedin":
        pluginUrl = `${pluginUrl}?utm_source=item-share-linkedin`;
        url = `https://www.linkedin.com/sharing/share-offsite/?text=${text}&url=${pluginUrl}`;
        break;
      case "reddit":
        pluginUrl = `${pluginUrl}?utm_source=item-share-reddit`;
        url = `https://www.reddit.com/submit?title=${text}&url=${pluginUrl}`;
        break;
      case "whatsapp":
        pluginUrl = `${pluginUrl}?utm_source=item-share-whatsapp`;
        url = `https://api.whatsapp.com/send?text=${text}%20${pluginUrl}`;
        break;
      default:
        return;
    }
    chrome.tabs.create({ url });
  };

  const email = "leeehosea@gmail.com";

  return (
    <Card title="Support the Author" style={{ marginTop: 16 }}>
      <Space direction="vertical" size="middle">
        <Text>If you like this extension, please consider supporting us:</Text>

        <Button type="primary" icon={<StarOutlined />} onClick={openStorePage}>
          Rate on Chrome Web Store
        </Button>

        <Flex gap={8}>
          <Icon color="#000" onClick={() => shareOnPlatform("x")}>
            <svg width="24" height="24" viewBox="0 0 1200 1227">
              <path
                d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284zM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854z"
                fill="#fff"
              ></path>
            </svg>
          </Icon>
          <Icon color="#1877F2" onClick={() => shareOnPlatform("facebook")}>
            <svg width="32" height="32" viewBox="0 0 16 16">
              <path
                fill="#1877F2"
                d="M15 8a7 7 0 0 0-7-7 7 7 0 0 0-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7 7 0 0 0 15 8"
              ></path>
              <path
                fill="#fff"
                d="M10.725 10.023 11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7 7 0 0 0 2.188 0v-4.892z"
              ></path>
            </svg>
          </Icon>
          <Icon
            color="rgb(10, 102, 194)"
            onClick={() => shareOnPlatform("linkedin")}
          >
            <svg viewBox="0 0 455.731 455.731" width="32" height="32">
              <path
                d="M0 0h455.731v455.731H0z"
                style={{ fill: "rgb(10, 102, 194)" }}
              ></path>
              <path
                d="M107.255 69.215c20.873.017 38.088 17.257 38.043 38.234-.05 21.965-18.278 38.52-38.3 38.043-20.308.411-38.155-16.551-38.151-38.188 0-20.985 17.282-38.105 38.408-38.089m22.176 317.256H84.71c-5.804 0-10.509-4.705-10.509-10.509V185.18c0-5.804 4.705-10.509 10.509-10.509h44.721c5.804 0 10.509 4.705 10.509 10.509v190.783c-.001 5.803-4.705 10.508-10.509 10.508m257.453-144.789c0-39.996-32.423-72.42-72.42-72.42h-11.47c-21.882 0-41.214 10.918-52.842 27.606a64 64 0 0 0-3.52 5.658c-.373-.056-.594-.085-.599-.075v-23.418a4.363 4.363 0 0 0-4.363-4.363h-55.795a4.363 4.363 0 0 0-4.363 4.363V382.11a4.363 4.363 0 0 0 4.361 4.363l57.011.014a4.363 4.363 0 0 0 4.364-4.363V264.801c0-20.28 16.175-37.119 36.454-37.348 10.352-.117 19.737 4.031 26.501 10.799 6.675 6.671 10.802 15.895 10.802 26.079v117.808a4.363 4.363 0 0 0 4.361 4.363l57.152.014a4.363 4.363 0 0 0 4.364-4.363V241.682z"
                style={{ fill: "rgb(255, 255, 255)" }}
              ></path>
            </svg>
          </Icon>
          <Icon color="#ff4500" onClick={() => shareOnPlatform("reddit")}>
            <span
              dangerouslySetInnerHTML={{
                __html: `<svg xml:space="preserve" viewBox="0 0 256 256" width="32" height="32"><path d="M0 0h256v256H0z" style="fill: rgb(255, 69, 0);"></path><radialGradient cx="1398.155" cy="1.811" r="127.45" fx="1398.155" fy="-7.319" gradientTransform="matrix(.47 0 0 -.41 -457.82 108.3)" gradientUnits="userSpaceOnUse" id="c66"><stop offset="0" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".4" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".51" style="stop-color: rgb(249, 252, 252);"></stop><stop offset=".62" style="stop-color: rgb(237, 243, 245);"></stop><stop offset=".7" style="stop-color: rgb(222, 233, 236);"></stop><stop offset=".72" style="stop-color: rgb(216, 228, 232);"></stop><stop offset=".76" style="stop-color: rgb(204, 216, 223);"></stop><stop offset=".8" style="stop-color: rgb(200, 213, 221);"></stop><stop offset=".83" style="stop-color: rgb(204, 214, 222);"></stop><stop offset=".85" style="stop-color: rgb(216, 219, 226);"></stop><stop offset=".88" style="stop-color: rgb(237, 227, 233);"></stop><stop offset=".9" style="stop-color: rgb(255, 235, 239);"></stop></radialGradient><path d="M230.496 123.701a29.9 29.9 0 0 1-29.899 29.899 29.9 29.9 0 0 1-29.899-29.899 29.899 29.899 0 0 1 59.797 0" style="fill: url(&quot;#c66&quot;);"></path><radialGradient cx="1089.389" cy="1.811" r="127.45" fx="1089.389" fy="-7.319" gradientTransform="matrix(.47 0 0 -.41 -457.82 108.3)" gradientUnits="userSpaceOnUse" id="c67"><stop offset="0" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".4" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".51" style="stop-color: rgb(249, 252, 252);"></stop><stop offset=".62" style="stop-color: rgb(237, 243, 245);"></stop><stop offset=".7" style="stop-color: rgb(222, 233, 236);"></stop><stop offset=".72" style="stop-color: rgb(216, 228, 232);"></stop><stop offset=".76" style="stop-color: rgb(204, 216, 223);"></stop><stop offset=".8" style="stop-color: rgb(200, 213, 221);"></stop><stop offset=".83" style="stop-color: rgb(204, 214, 222);"></stop><stop offset=".85" style="stop-color: rgb(216, 219, 226);"></stop><stop offset=".88" style="stop-color: rgb(237, 227, 233);"></stop><stop offset=".9" style="stop-color: rgb(255, 235, 239);"></stop></radialGradient><path d="M85.301 123.701A29.9 29.9 0 0 1 55.402 153.6a29.9 29.9 0 0 1-29.899-29.899 29.899 29.899 0 0 1 59.797 0" style="fill: url(&quot;#c67&quot;);"></path><radialGradient cx="1247.805" cy="-224.685" r="384.44" gradientTransform="matrix(.47 0 0 -.33 -457.82 25.03)" gradientUnits="userSpaceOnUse" id="c68"><stop offset="0" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".4" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".51" style="stop-color: rgb(249, 252, 252);"></stop><stop offset=".62" style="stop-color: rgb(237, 243, 245);"></stop><stop offset=".7" style="stop-color: rgb(222, 233, 236);"></stop><stop offset=".72" style="stop-color: rgb(216, 228, 232);"></stop><stop offset=".76" style="stop-color: rgb(204, 216, 223);"></stop><stop offset=".8" style="stop-color: rgb(200, 213, 221);"></stop><stop offset=".83" style="stop-color: rgb(204, 214, 222);"></stop><stop offset=".85" style="stop-color: rgb(216, 219, 226);"></stop><stop offset=".88" style="stop-color: rgb(237, 227, 233);"></stop><stop offset=".9" style="stop-color: rgb(255, 235, 239);"></stop></radialGradient><path d="M213.397 149.301a85.301 64 0 0 1-85.301 64 85.301 64 0 0 1-85.301-64 85.301 64 0 0 1 170.603 0" style="fill: url(&quot;#c68&quot;);"></path><path d="M102.795 143.104c-.501 10.805-7.701 14.805-16.096 14.805s-14.805-5.6-14.304-16.395 7.701-18.005 16.096-18.005 14.805 8.8 14.304 19.605m80.8-1.6c.501 10.805-5.899 16.395-14.304 16.395s-15.595-3.904-16.096-14.805c-.501-10.805 5.899-19.605 14.304-19.605s15.595 7.104 16.096 18.005" style="fill: rgb(132, 33, 35);"></path><radialGradient cx="-2540.135" cy="173.422" r="32.12" gradientTransform="matrix(-.47 0 0 .69 -1026.88 31.31)" gradientUnits="userSpaceOnUse" id="c69"><stop offset="0" style="stop-color: rgb(255, 102, 0);"></stop><stop offset=".5" style="stop-color: rgb(255, 69, 0);"></stop><stop offset=".7" style="stop-color: rgb(252, 67, 1);"></stop><stop offset=".82" style="stop-color: rgb(244, 63, 7);"></stop><stop offset=".92" style="stop-color: rgb(229, 56, 18);"></stop><stop offset="1" style="stop-color: rgb(212, 48, 31);"></stop></radialGradient><path d="M153.301 144.096c.501 10.101 7.2 13.803 14.997 13.803s13.803-5.504 13.397-15.701c-.501-10.101-7.2-16.8-14.997-16.8s-13.899 8.501-13.397 18.699" style="fill: url(&quot;#c69&quot;);"></path><radialGradient cx="1162.355" cy="173.422" r="32.12" gradientTransform="matrix(.47 0 0 .69 -457.82 31.31)" gradientUnits="userSpaceOnUse" id="c70"><stop offset="0" style="stop-color: rgb(255, 102, 0);"></stop><stop offset=".5" style="stop-color: rgb(255, 69, 0);"></stop><stop offset=".7" style="stop-color: rgb(252, 67, 1);"></stop><stop offset=".82" style="stop-color: rgb(244, 63, 7);"></stop><stop offset=".92" style="stop-color: rgb(229, 56, 18);"></stop><stop offset="1" style="stop-color: rgb(212, 48, 31);"></stop></radialGradient><path d="M102.795 144.096c-.501 10.101-7.2 13.803-14.997 13.803s-13.803-5.504-13.301-15.701c.501-10.101 7.2-16.8 14.997-16.8s13.803 8.501 13.301 18.699" style="fill: url(&quot;#c70&quot;);"></path><path d="M128.096 165.099c-10.603 0-20.704.501-30.101 1.397-1.6.203-2.603 1.803-2.005 3.2 5.205 12.299 17.6 21.003 32.096 21.003s26.805-8.597 32.096-21.003a2.315 2.315 0 0 0-2.005-3.2 320 320 0 0 0-30.101-1.397" style="fill: rgb(187, 207, 218);"></path><path d="M128.096 167.499c-10.603 0-20.704.501-30.005 1.504a2.42 2.42 0 0 0-2.005 3.296 34.677 34.677 0 0 0 64 0 2.42 2.42 0 0 0-2.005-3.296 288 288 0 0 0-30.005-1.504" style="fill: rgb(255, 255, 255);"></path><radialGradient cx="1243.585" cy="-508.476" r="113.26" gradientTransform="matrix(.47 0 0 -.31 -457.82 37.28)" gradientUnits="userSpaceOnUse" id="c71"><stop offset="0" style="stop-color: rgb(23, 46, 53);"></stop><stop offset=".29" style="stop-color: rgb(14, 28, 33);"></stop><stop offset=".73" style="stop-color: rgb(3, 7, 8);"></stop><stop offset="1" style="stop-color: rgb(0, 0, 0);"></stop></radialGradient><path d="M128.096 166.197c-10.4 0-20.299.501-29.504 1.397-1.6.203-2.603 1.803-2.005 3.2 5.205 12.299 17.301 21.003 31.499 21.003s26.304-8.597 31.499-21.003a2.315 2.315 0 0 0-2.005-3.2 341 341 0 0 0-29.504-1.397" style="fill: url(&quot;#c71&quot;);"></path><radialGradient cx="1343.475" cy="277.902" r="99.42" gradientTransform="matrix(.47 0 0 -.47 -457.82 164.72)" gradientUnits="userSpaceOnUse" id="c72"><stop offset="0" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".4" style="stop-color: rgb(254, 255, 255);"></stop><stop offset=".51" style="stop-color: rgb(249, 252, 252);"></stop><stop offset=".62" style="stop-color: rgb(237, 243, 245);"></stop><stop offset=".7" style="stop-color: rgb(222, 233, 236);"></stop><stop offset=".72" style="stop-color: rgb(216, 228, 232);"></stop><stop offset=".76" style="stop-color: rgb(204, 216, 223);"></stop><stop offset=".8" style="stop-color: rgb(200, 213, 221);"></stop><stop offset=".83" style="stop-color: rgb(204, 214, 222);"></stop><stop offset=".85" style="stop-color: rgb(216, 219, 226);"></stop><stop offset=".88" style="stop-color: rgb(237, 227, 233);"></stop><stop offset=".9" style="stop-color: rgb(255, 235, 239);"></stop></radialGradient><path d="M196 55.499a21.195 21.195 0 0 1-21.195 21.205A21.195 21.195 0 0 1 153.6 55.499a21.195 21.195 0 0 1 42.4 0" style="fill: url(&quot;#c72&quot;);"></path><radialGradient cx="1302.035" cy="177.562" r="81.49" gradientTransform="matrix(.47 0 0 -.47 -457.82 168.5)" gradientUnits="userSpaceOnUse" id="c73"><stop offset=".48" style="stop-color: rgb(122, 146, 153);"></stop><stop offset=".67" style="stop-color: rgb(23, 46, 53);"></stop><stop offset=".75" style="stop-color: rgb(0, 0, 0);"></stop><stop offset=".82" style="stop-color: rgb(23, 46, 53);"></stop></radialGradient><path d="M127.797 88c-2.496 0-4.597-1.099-4.597-2.699a34.4 34.4 0 0 1 34.4-34.4c2.496 0 4.597 2.101 4.597 4.597s-2.101 4.597-4.597 4.597a25.227 25.227 0 0 0-25.195 25.195c0 1.696-2.101 2.699-4.597 2.699" style="fill: url(&quot;#c73&quot;);"></path><path d="M97.301 149.099c0 3.904-4.203 5.696-9.301 5.696s-9.301-1.803-9.301-5.696 4.203-7.104 9.301-7.104 9.301 3.104 9.301 7.104m80.203 0c0 3.904-4.203 5.696-9.301 5.696s-9.301-1.803-9.301-5.696 4.203-7.104 9.301-7.104 9.301 3.104 9.301 7.104" style="fill: rgb(255, 97, 1);"></path><path d="M97.696 134.805A3.296 3.605 0 0 1 94.4 138.4a3.296 3.605 0 0 1-3.296-3.595 3.296 3.605 0 0 1 6.592 0m78.901 0a3.296 3.605 0 0 1-3.296 3.595 3.296 3.605 0 0 1-3.296-3.595 3.296 3.605 0 0 1 6.592 0" style="fill: rgb(255, 196, 156);"></path></svg>`,
              }}
            ></span>
          </Icon>
          <Icon color="#25d366" onClick={() => shareOnPlatform("whatsapp")}>
            <span
              dangerouslySetInnerHTML={{
                __html: `<svg width="24" height="24" viewBox="0 0 360 362"><path fill-rule="evenodd" clip-rule="evenodd" d="M307.546 52.566C273.709 18.685 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847s2.983-4.486 4.478-7.469c1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155s-7.839 1.118-11.947 5.604-15.677 15.324-15.677 37.361 16.047 43.344 18.29 46.335 31.585 48.225 76.51 67.632c10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298s3.73-19.433 2.613-21.298-4.108-2.991-8.586-5.234z" fill="#fff"></path></svg>`,
              }}
            ></span>
          </Icon>
        </Flex>

        <Text>
          Have questions or suggestions? Contact us at:{" "}
          <a href={`mailto:${email}`}>{email}</a>
        </Text>
      </Space>
    </Card>
  );
}

const Icon = ({ children, color, onClick = () => {} }) => {
  return (
    <Flex
      style={{
        borderRadius: "6px",
        width: 40,
        height: 40,
        overflow: "hidden",
        backgroundColor: color,
        cursor: "pointer",
      }}
      align="center"
      justify="center"
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
