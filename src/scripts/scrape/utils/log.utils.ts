export enum Result {
  ALREADY_SCRAPED = "is already scraped",
  SCRAPED = "scraped successfully",
}

export function logResult(id: number, result: Result): void {
  const paddedId = id.toString().padStart(5, " ");
  console.log(`${paddedId} ${result}`);
}
