import { StepperHeaderContainer } from '@/app/(services)/promoter/dashboard/create-event/_components/StepperHeaderContainer';
import EventCreationForm from '@/app/(services)/promoter/dashboard/create-event/_components/EventCreationForm';

export function Stepper() {
  return (
    <div className="space-y-4">
      <div className="bg-background border rounded-md p-4">
        <StepperHeaderContainer />
      </div>
      <div className="bg-background border rounded-md p-4">
        <EventCreationForm />
      </div>
    </div>
  );
}
