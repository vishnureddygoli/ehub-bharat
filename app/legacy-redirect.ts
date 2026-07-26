export function legacyRedirect(request: Request, destination: string) {
  return new Response(null, {
    status: 301,
    headers: {
      Location: new URL(destination, request.url).toString(),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
