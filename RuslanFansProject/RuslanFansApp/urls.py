from django.urls import path, re_path
from django.urls.conf import include
from rest_framework import permissions, routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from RuslanFansApp.views import *


router = routers.SimpleRouter()
router.register(r"posts", PostsApiView)
router.register(r"profile", ProfileApiView, basename="profile")
router.register(r"comments", CommentsApiView)
router.register(r"bookmark", BookmarkApiView)
router.register(r"notifications", NotificationsApiView)
router.register(r"wallet", WalletApiView)
router.register(r"subscriptions", SubscriptionsApiView)

schema_view = get_schema_view(
    openapi.Info(
        title="Ruslan Fans",
        default_version="v1",
        description="Ruslan Fans API",
    ),
    public=True,
    permission_classes=([permissions.AllowAny,]),
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),

    path("", include(router.urls)),

    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),

    # path("posts", PostsApiView.as_view()),
    # path("posts/create", PostsCreateApiView.as_view()),
    # path("posts/<int:pk>", PostsRetrieveApiView.as_view()),
    # path("posts/<int:pk>/update", PostsUpdateApiView.as_view()),
    # path("posts/<int:pk>/delete", PostsDestroyApiView.as_view()),
    #
    # path("profile", ProfileApiView.as_view()),
    # path("profile/<int:pk>/update", ProfileUpdateApiView.as_view()),
    #
    # path("comments", CommentsApiView.as_view()),
    # path("comments/<int:pk>/update", CommentsUpdateApiView.as_view()),
    #
    # path("bookmark", BookmarkApiView.as_view()),
    # path("bookmark/<int:pk>/update", BookmarkUpdateApiView.as_view()),
    #
    # path("notifications", NotificationsApiView.as_view()),
    # path("notifications/<int:pk>/update", NotificationsUpdateApiView.as_view()),
    #
    # path("wallet", WalletApiView.as_view()),
    # path("wallet/<int:pk>/update", WalletUpdateApiView.as_view()),
]