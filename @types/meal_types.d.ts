export type UpdateMealsInput = {
  id: string
  created_at?: Date | null
  description?: string | null
  name?: string | undefined | null
  part_of_diet?: boolean | null
}
