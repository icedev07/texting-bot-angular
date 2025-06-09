import { ParseTextBotCommandOutput, Group } from './interfaces';
/**
 * We're writing a command line program that users can use to send text messages
 * to different groups of people. The program will take in a string, and parse it
 * to determine which group of people to send the message to, and what the message
 * should be.
 *
 * For example, if the user says "txt GROUP1 Hello, world!", the program
 * should send the message "Hello, world!" to everyone in GROUP1.
 *
 * If there is a group named "sart group", and the user says "txt sart group Hello, world!",
 * then we'll send a text message to everyone in the "sart group" group.
 *
 * Your goal here is to implement the `parseTextBotCommand` function, which will
 * determine the group to send the message to, and the message to send.
 *
 * Details:
 * - When parsing the group name, please ignore any leading or
 * trailing whitespace, case, and any whitespace between words (e.g.,
 * if the group name contains multiple words). For example, if the message is
 * "txt   hotline  1  Hello,  world!" then it should send the message "Hello,  world!"
 * to the "hotline 1" group. If the group name is hotline and the message is "txt hot line hello"
 * then it should send the message "hello" to the group "hotline".
 * - If the message provided could refer to multiple different groups
 * then please use the longest group in the groups array
 * is the correct one. For example, if "test copy" and "test" are both
 * possible groups, then "txt test copy one" should send the message "one"
 * to the "test copy" group.
 *
 * - Once you've parsed the group name please return the
 * message with leading and trailing whitespace removed and no
 * other changes. Empty values for "messageToSend" are allowed.
 *
 * If you cannot determine a group and message, return null.
 *
 * @param rawInput The raw input string from the user
 * @param groups Array of available groups
 * @returns ParseTextBotCommandOutput or null if parsing fails
 */

export const parseTextBotCommand = (rawInput: string, groups: Group[]): ParseTextBotCommandOutput | null => {
  // Check if input starts with "txt" (case insensitive)
  const txtPrefix = rawInput.toLowerCase().trim().startsWith('txt');
  if (!txtPrefix) {
    return null;
  }

  // Remove "txt" prefix and trim
  const inputWithoutPrefix = rawInput.slice(3).trim();

  // Find the longest matching group
  let bestMatch: { group: Group; startIndex: number; endIndex: number } | null = null;

  for (const group of groups) {
    // Normalize both the group name and input by removing all spaces and converting to lowercase
    const normalizedGroupName = group.name.toLowerCase().replace(/\s+/g, '');
    const normalizedInput = inputWithoutPrefix.toLowerCase().replace(/\s+/g, '');

    // Try to find the group name in the input
    const startIndex = normalizedInput.indexOf(normalizedGroupName);
    if (startIndex !== -1) {
      const endIndex = startIndex + normalizedGroupName.length;
      
      // If this is the first match or longer than previous match
      if (!bestMatch || (endIndex - startIndex) > (bestMatch.endIndex - bestMatch.startIndex)) {
        bestMatch = {
          group,
          startIndex,
          endIndex
        };
      }
    }
  }

  if (!bestMatch) {
    return null;
  }

  // Find the actual group name in the original input
  const originalInput = inputWithoutPrefix.toLowerCase();
  const groupName = bestMatch.group.name.toLowerCase();
  
  // Create a regex pattern that matches the group name with flexible whitespace
  const groupNamePattern = groupName.split(/\s+/).join('\\s+');
  const groupRegex = new RegExp(groupNamePattern, 'i');
  const groupMatch = originalInput.match(groupRegex);
  
  if (!groupMatch) {
    return null;
  }

  // Extract the message part (everything after the group name)
  const messageStartIndex = groupMatch.index! + groupMatch[0].length;
  const message = inputWithoutPrefix.slice(messageStartIndex).trim();

  return {
    groupId: bestMatch.group.id,
    messageToSend: message
  };
};
