import { expect, test } from "bun:test";
import { team, teamForDisplay } from "@/content/team";

test("every team member points to a unique public portrait asset", async () => {
  const photos = team.map((member) => member.photo);

  expect(team).toHaveLength(5);
  expect(photos.every((photo) => typeof photo === "string" && /^\/team\/[^/]+\.webp$/.test(photo))).toBe(true);
  expect(new Set(photos).size).toBe(team.length);

  for (const photo of photos) {
    expect(await Bun.file(`public${photo}`).exists()).toBe(true);
  }
});

test("team records publish bilingual card copy without placeholders", () => {
  expect(team.map((member) => member.id)).toEqual([
    "member-1",
    "member-2",
    "member-3",
    "member-4",
    "member-5",
  ]);
  expect(team.map((member) => member.name.en)).toEqual([
    "Enes Özkan",
    "M. Hulusi Aydoğan",
    "C. Çağatay Şentürk",
    "A. Harun Öztürk",
    "Y. Hamza Çelebi",
  ]);
  expect(team.every((member) => [member.name.tr, member.name.en, member.role.tr, member.role.en, member.background.tr, member.background.en]
    .every((value) => value.length > 0 && !value.includes("[COPY NEEDED")))).toBe(true);
});

test("team display order separates the similarly colored portraits", () => {
  expect(teamForDisplay.map((member) => member.id)).toEqual([
    "member-1",
    "member-2",
    "member-4",
    "member-5",
    "member-3",
  ]);
  expect(teamForDisplay.map((member) => member.photo)).toEqual([
    "/team/enes.webp",
    "/team/hulusi.webp",
    "/team/abdullah.webp",
    "/team/hamza.webp",
    "/team/cagatay.webp",
  ]);
});
