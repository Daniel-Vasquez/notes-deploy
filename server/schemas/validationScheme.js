import zod from "zod";

const noteSchema = zod.object({
  content: zod.string({
    invalid_type_error: "Note content must be a string",
    required_error: "Note content is required",
  }),
});

export function validateNote(object) {
  return noteSchema.safeParse(object)
}

export function validatePartialNote(object) {
  return noteSchema.partial().safeParse(object)
}
