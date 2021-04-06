$(document).ready(function () {
    $('.sign-in').fadeOut()
    $('.close-form').click(() => $('.sign-in').fadeOut())
    $('.account').click(() => {
        $('.sign-in').fadeIn()
    })


    $('.message a, .sign-up-btn').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        $('.form h3').html('SIGN UP')
    });

    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student", "Font-end Dev", "Good Boy", "Designer", "Angel"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", "Font-end Dev", "Good Boy", "Designer", "Angel"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});

const DATA = [
    {
      id: 1,
      title: "Loard Of The Rings",
      category: "Movies",
      date: "",
      isDone: false
    },
    { id: 2, title: "God Father I", category: "Movies", date: "", isDone: false },
    {
      id: 3,
      title: "Seven Angry Man",
      category: "Movies",
      date: "",
      isDone: false
    },
    { id: 4, title: "Pulp Fiction", category: "Movies", date: "", isDone: true },
    {
      id: 5,
      title: "The Brothers Karamazov",
      category: "Books",
      date: "",
      isDone: true
    },
    {
      id: 6,
      title: "The Master and Margarita",
      category: "Books",
      date: "",
      isDone: false
    },
    { id: 7, title: "Don Quixote", category: "Books", date: "", isDone: false }
  ];
  
  class Todolist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        edit: null,
        title: "",
        category: "",
        date: "",
        tasks: props.tasks
      };
  
      this.clickAddHandler = this.clickAddHandler.bind(this);
      this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
      this.onCategoryChangeHandler = this.onCategoryChangeHandler.bind(this);
      this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
      this.taskDoneHandler = this.taskDoneHandler.bind(this);
      this.taskEditHandler = this.taskEditHandler.bind(this);
      this.taskDeleteHandler = this.taskDeleteHandler.bind(this);
    }
  
    taskCompletion() {
      const { tasks } = this.state;
      const totalTasksNum = tasks.length === 0 ? 1 : tasks.length;
      const completedTasksNum = tasks.filter((n) => n.isDone === true).length;
      return Math.floor((completedTasksNum * 100) / totalTasksNum);
    }
  
    onTitleChangeHandler(e) {
      this.setState((state) => ({ title: e.target.value }));
    }
  
    onCategoryChangeHandler(e) {
      this.setState((state) => ({ category: e.target.value }));
    }
  
    onDateChangeHandler(e) {
      this.setState((state) => ({ date: e.target.value }));
    }
  
    clickAddHandler() {
      const { edit, title, category, date, tasks } = this.state;
  
      if (title === "") return;
  
      if (edit === null) {
        const task = {
          id: generateID(),
          title: title,
          category: category,
          date: date,
          isDone: false
        };
        this.setState((state) => ({
          title: "",
          category: "",
          date: "",
          tasks: [task, ...state.tasks]
        }));
      } else {
        let task = tasks.find((n) => n.id === edit);
        task.title = title;
        task.category = category;
        task.date = date;
        this.setState((state) => ({
          title: "",
          category: "",
          date: "",
          tasks: tasks,
          edit: null
        }));
      }
    }
  
    taskDoneHandler(id) {
      this.setState((state) => {
        let { tasks } = state;
        let task = tasks.find((n) => n.id === id);
        task.isDone = !task.isDone;
        return { tasks: tasks };
      });
    }
  
    taskEditHandler(id) {
      this.setState((state) => {
        const task = state.tasks.find((n) => n.id === id);
        return {
          edit: id,
          title: task.title,
          category: task.category,
          date: task.date
        };
      });
    }
  
    taskDeleteHandler(id) {
      this.setState((state) => {
        let { tasks } = state;
        let task = tasks.find((n) => n.id === id);
        tasks.splice(tasks.indexOf(task), 1);
        return { tasks: tasks };
      });
    }
  
    render() {
      const { title, category, date, tasks, edit } = this.state;
      const dateOpt = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return (
        <div class="todo">
          <Today className={"todo__date"} options={dateOpt} />
          <div class="todo__ctrls">
            <Input
              type={"text"}
              value={title}
              placeholder={"Task Name..."}
              onChangeHandler={this.onTitleChangeHandler}
            />
            <Input
              type={"text"}
              value={category}
              placeholder={"Task Category..."}
              onChangeHandler={this.onCategoryChangeHandler}
            />
            <Input
              type={"date"}
              value={date}
              onChangeHandler={this.onDateChangeHandler}
            />
            <Button onClickHandler={this.clickAddHandler}>
              {edit === null ? (
                <Icon>playlist_add</Icon>
              ) : (
                <Icon>playlist_add_check</Icon>
              )}
            </Button>
          </div>
          <div class="todo__list">
            <TaskList
              data={tasks}
              onDoneCallback={this.taskDoneHandler}
              onEditCallback={this.taskEditHandler}
              onDeleteCallback={this.taskDeleteHandler}
            />
          </div>
          <div class="todo__completion">
            Task Completion: {this.taskCompletion()}%
          </div>
        </div>
      );
    }
  }
  
  class TaskListItem extends React.Component {
    constructor(props) {
      super(props);
  
      this.clickDoneHandler = this.clickDoneHandler.bind(this);
      this.clickEditHandler = this.clickEditHandler.bind(this);
      this.clickDeleteHandler = this.clickDeleteHandler.bind(this);
    }
  
    clickDoneHandler() {
      const { onDoneCallback } = this.props;
      onDoneCallback(this.props.id);
    }
  
    clickEditHandler() {
      const { onEditCallback } = this.props;
      onEditCallback(this.props.id);
    }
  
    clickDeleteHandler() {
      const { onDeleteCallback } = this.props;
      onDeleteCallback(this.props.id);
    }
  
    render() {
      const { id, title, date, isDone } = this.props;
      return (
        <div class="task">
          <Button className="task__status" onClickHandler={this.clickDoneHandler}>
            {isDone ? (
              <Icon>check_box</Icon>
            ) : (
              <Icon>check_box_outline_blank</Icon>
            )}
          </Button>
          <div class={isDone ? "task__title crossout" : "task__title"}>
            {date ? `${date}:  ` : ""}
            {title}
          </div>
          <div class="task__ctrls">
            <Button onClickHandler={this.clickEditHandler}>
              <Icon>edit</Icon>
            </Button>
            <Button onClickHandler={this.clickDeleteHandler}>
              <Icon>delete</Icon>
            </Button>
          </div>
        </div>
      );
    }
  }
  
  function TaskList(props) {
    const { onDoneCallback, onEditCallback, onDeleteCallback } = props;
    const tasks = props.data.sort((a, b) => {
      if (a.category > b.category) return 1;
      if (a.category < b.category) return -1;
      return 0;
    });
  
    let currCategory = null;
    return (
      <ul>
        {tasks.map((v) => {
          let currTask = (
            <TaskListItem
              {...v}
              onDoneCallback={onDoneCallback}
              onEditCallback={onEditCallback}
              onDeleteCallback={onDeleteCallback}
            />
          );
  
          if (v.category != currCategory && v.category != "") {
            currCategory = v.category;
            return (
              <>
                <li key={generateID()}>
                  <b>{currCategory}</b>
                </li>
                <li key={v.id}>{currTask}</li>
              </>
            );
          } else {
            return <li key={v.id}>{currTask}</li>;
          }
        })}
      </ul>
    );
  }
  
  function Button(props) {
    return (
      <button
        type="button"
        class={props.className}
        onClick={props.onClickHandler}
      >
        {props.children}
      </button>
    );
  }
  
  function Input(props) {
    return (
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChangeHandler}
      />
    );
  }
  
  function Today(props) {
    const today = new Date();
    return (
      <div class={props.className}>
        {" "}
        Today: {today.toLocaleDateString("en-US", props.options)}
      </div>
    );
  }
  
  function Icon(props) {
    return <i class="material-icons">{props.children}</i>;
  }
  
  function App() {
    return <Todolist tasks={DATA} />;
  }
  
  ReactDOM.render(<App />, document.getElementById("app"));
  
  //---- helper functions ---//
  
  function generateID(len = 5) {
    let id = "";
    for (let i = 0; i < len; i++) {
      id += Math.floor(Math.random() * 32).toString(32);
    }
    return id;
  }
  