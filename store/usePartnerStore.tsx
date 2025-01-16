"use client";

import { create } from "zustand";
import { Partner } from "@/hooks/usePartners"; // Import your Partner interface

interface PartnerStore {
  selectedPartner: Partner | null;
  setSelectedPartner: (partner: Partner | null) => void;
}

export const usePartnerStore = create<PartnerStore>((set) => ({
  selectedPartner: null,
  setSelectedPartner: (partner) => set({ selectedPartner: partner }),
}));
