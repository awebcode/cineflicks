export interface VideoFormData {
  videoFile: File | null;
  videoUrl: string;
  title: string;
  description: string;
  timing: string;
  language: string;
  cast: CastMember[];
}

export interface CastMember {
  id: string;
  name: string;
  bio: string;
}
