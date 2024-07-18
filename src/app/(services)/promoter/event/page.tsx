'use client'

//import eventCategory from "@/server/db/schema/eventCategory";
import { steps } from '@/constants/consts'
import { useSteps } from '@/context/ctx-event-steps'
import EventCreationForm from '@/components/layout/promoter/event/EventCreationForm'

export default function EventPage() {
  const { currentStep } = useSteps();
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
    <div className='bg-background text-foreground flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0 mb-8'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium  transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-primary'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-foreground py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-muted-foreground transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <EventCreationForm />


    </div>
  )
}
