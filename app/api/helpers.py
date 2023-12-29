def is_lecturer(user):
    return user.groups.filter(name__in=['LECTURER']).exists()


def is_student(user):
    return user.groups.filter(name__in=['STUDENT']).exists()
