
import { google } from "googleapis";
import { GoogleTokenData } from "./types";

export async function createGoogleDoc(tokens: GoogleTokenData, title: string, content: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials(tokens);

  const docs = google.docs({ version: "v1", auth });

  const doc = await docs.documents.create({
    requestBody: {
      title,
    }
  });

  const documentId = doc.data.documentId;

  if (!documentId) {
    throw new Error("Failed to create document: documentId is undefined.");
  }

  // Insert text into document
  await docs.documents.batchUpdate({
    documentId: documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: content
          }
        }
      ]
    }
  });

  return documentId;
}
