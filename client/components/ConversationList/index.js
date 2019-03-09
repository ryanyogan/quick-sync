import moment from "moment";

import Avatar from "../ui/Avatar";
import AuthenticatedUser from "../AuthenticatedUser";

export default class ConversationList extends React.Component {
  componentDidMount() {
    // When we add in subscriptions
    // this.props.subscribeToNewConversationMessages();
  }

  render() {
    const { loading, error, conversations, onClick } = this.props;

    if (loading) return <div>Loading...</div>;
    if (error) return error.toString();

    return (
      <AuthenticatedUser>
        {({ isAuthenticated, data: { me } }) =>
          isAuthenticated && (
            <ul className="list-reset">
              <li className="font-bold m-4">Conversations</li>
              {conversations.map(conversation => {
                const conversationHasMessages =
                  conversation.messages.length > 0;
                const lastMessage = conversationHasMessages
                  ? conversation.messages[conversation.messages.length - 1]
                  : null;
                const lastMessageAuthorIsMe =
                  conversationHasMessages && lastMessage.author.id === me.id;

                return (
                  <li
                    key={conversation.id}
                    className="px-4 py-2 hover:bg-grey-lightest cursor-pointer flex items-center"
                    onClick={() => onClick(conversation)}
                  >
                    <div className="mr-3">
                      <Avatar initials={conversation.name} />
                    </div>
                    <div className="text-sm flex-1">
                      <div className="font-bold">{conversation.name}</div>
                      <div className="flex justify-between text-grey-dark">
                        <div
                          className="mt-1 w-32 overflow-hidden whitespace-no-wrap"
                          style={{ textOverflow: "ellipsis " }}
                        >
                          {lastMessageAuthorIsMe && "You: "}
                          {conversationHasMessages && lastMessage.text}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-grey-dark">
                      {conversationHasMessages &&
                        moment(lastMessage.createdAt).fromNow()}
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        }
      </AuthenticatedUser>
    );
  }
}
