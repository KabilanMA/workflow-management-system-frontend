import { render, screen, fireEvent } from '@testing-library/react';
import SubtaskOrderTimeline from "../components/SubtaskOrderTimeline"
import { BrowserRouter } from "react-router-dom"
import { fDateTime } from '../utils/formatTime';

const DATE1 = new Date("2055-10-31T00:00:00.000+00:00")
const DATE2 = new Date("2021-10-31T00:00:00.000+00:00")

const subtask1 = {
    id: "test-subtask1-id",
    title: "test-subtask1-title",
    status: 3,
    deadline: DATE1
}
const subtask2 = {
    id: "test-subtask2-id",
    title: "test-subtask2-title",
    status: 2,
    deadline: DATE2
}

const MockSubtaskOrderTimelineWithSingleSubtask = () => {
    return (
        <BrowserRouter>
            <SubtaskOrderTimeline
                title="Test SubtaskOrderTimeline mainTitle 1"
                subheader="Category: some-test-categoryy"
                list={[subtask1]}
        />
        </BrowserRouter>
    )
}


const MockSubtaskOrderTimelineWithMultipleSubtasks = () => {
    return (
        <BrowserRouter>
            <SubtaskOrderTimeline
                title="Test SubtaskOrderTimeline mainTitle 1"
                subheader="Category: some-test-category"
                list={[subtask1, subtask2]} />
        </BrowserRouter>
    )
}

describe("<SubtaskOrderTimeline /> ", () => {
    describe("When rendered with a single subtask", () => {
        it('should render the elements correctly', () => {
            render(
                <MockSubtaskOrderTimelineWithSingleSubtask />
            );
            const cardHeaderElement = screen.getByTestId("subtaskOrderTimeline-cardHeader");    
            const TimelineDotElement = screen.getByTestId("subtaskOrderTimeline-timelineDot");
            const subtaskTitle = screen.getByTestId("subtaskOrderTimeline-title");    
            const subtaskDeadline = screen.getByTestId("subtaskOrderTimeline-deadline");
            
            expect(cardHeaderElement).toBeInTheDocument()
            expect(cardHeaderElement).toHaveTextContent("Category: some-test-category")
            expect(TimelineDotElement).toBeInTheDocument()
            expect(subtaskTitle).toHaveTextContent("test-subtask1-title")
            expect(subtaskDeadline).toHaveTextContent(fDateTime(DATE1))
        });
    })

    describe("When rendered with multiple subtasks", () => {
        it('should render the elements correctly', () => {
            render(
                <MockSubtaskOrderTimelineWithMultipleSubtasks />
            );
  
            const TimelineDotElements = screen.getAllByTestId("subtaskOrderTimeline-timelineDot");
            const subtaskTitles = screen.getAllByTestId("subtaskOrderTimeline-title");    
            const subtaskDeadlines = screen.getAllByTestId("subtaskOrderTimeline-deadline");
            
            expect(TimelineDotElements.length).toBe(2)
            expect(subtaskTitles.length).toBe(2)
            expect(subtaskDeadlines.length).toBe(2)

            // console.log(TimelineDotElement)
            // expect(TimelineDotElement.classList.contains("MuiTimelineDot-filledWarning")).toBeTruthy()
        });
    })
})