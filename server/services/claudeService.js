import anthropic from "./anthropicClient.js";

export const filterPhotosWithClaude = async (photos, description) => {
  console.log("Description:", description);
//CHECK MODEL
  const response = await anthropic.messages.create({
    //model: "claude-sonnet-4-20250514",
    //model: "claude-haiku-4-5"
    model: "claude-sonnet-5",
    max_tokens: 300,

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `The user wants photos where:
${description}

Reply ONLY with OK.`,
          },
        ],
      },
    ],
  });

  console.log(response.content);

  return photos;
};

//-------------------------------------
/* export const filterPhotosWithClaude = async (photos, description) => {
  console.log("Claude Description:", description);

  // TODO:
  // Call Anthropic Claude
  // Filter the photos

  return photos;
};
 */