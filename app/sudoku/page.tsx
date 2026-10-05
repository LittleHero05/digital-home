import type { Metadata } from "next";
import { InnerNav } from "@/components/InnerNav";
import { SudokuGame } from "@/components/SudokuGame";
import { puzzles, sudokuDifficulty, sudokuStartDate } from "@/content/sudoku";

export const metadata: Metadata = {
  title: "Today's sudoku · Digital Home",
  description: "A small daily sudoku. Solve it to fill a square in the curiosity tracker.",
};

export default function SudokuPage() {
  return (
    <>
      <InnerNav path={["sudoku"]} />
      <SudokuGame puzzles={puzzles} startDate={sudokuStartDate} difficulty={sudokuDifficulty} />
    </>
  );
}
