import { Stepper } from '@/app/(services)/promoter/dashboard/create-event/_components/Stepper';
import { StepsProvider } from '@/app/_context/ctx-event-steps';

export default function EventPage() {
  //#region descomentar para entradas
  // const [entries, setEntries] = useState([{ id: 1 }])
  // const addEntry = () => {
  //   setEntries([...entries, { id: entries.length + 1 }])
  //   console.log(entries.length)
  // }
  // const removeLastEntry = () => {
  //   if (entries.length > 1) {
  //     setEntries(entries.slice(0, entries.length - 1))
  //   }
  // }
  //#endregion

  //const eventCategories = await db.select().from(eventCategory);
  return (
    <div className="text-foreground flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <StepsProvider>
        <Stepper />
      </StepsProvider>
    </div>
  );
}
